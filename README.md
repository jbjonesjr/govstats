# govstats
code.gov stats tooling

## 11/09 data pull  
   
### Top ten projects by stars
| | | |
|---|---|---|
| 1 | [nasa/openmct](https://github.com/nasa/openmct) | 5282 |
| 2 | [USArmyResearchLab/Dshell](https://github.com/USArmyResearchLab/Dshell) | 5098 |
| 3 | [scipy/scipy](https://github.com/scipy/scipy) | 5079 |
| 4 | [nasa/NASA-3D-Resources](https://github.com/nasa/NASA-3D-Resources) | 1422 |
| 5 | [GSA/data](https://github.com/GSA/data) | 1353 |
| 6 | [GSA/data.gov](https://github.com/GSA/data.gov) | 1278 |
| 7 | [Code-dot-mil/code.mil](https://github.com/Code-dot-mil/code.mil) | 1229 |
| 8 | [openscenegraph/OpenSceneGraph](https://github.com/openscenegraph/OpenSceneGraph) | 1177 |
| 9 | [WhiteHouse/petitions](https://github.com/WhiteHouse/petitions) | 177 |
| 10| [NREL/api-umbrella](https://github.com/NREL/api-umbrella) | 1172 |

### Top ten projects by forks
| | | |
|---|---|---|
| 1 | [scipy/scipy](https://github.com/scipy/scipy) | 2556 |
| 2 | [USArmyResearchLab/Dshell](https://github.com/USArmyResearchLab/Dshell) | 1164 |
| 3 | [openscenegraph/OpenSceneGraph](https://github.com/openscenegraph/OpenSceneGraph) | 720 |
| 4 | [nasa/openmct](https://github.com/nasa/openmct) | 585 |
| 5 | [spack/spack](https://github.com/spack/spack) | 539 |
| 6 | [lammps/lammps](https://github.com/lammps/lammps) | 534 |
| 7 | [idaholab/moose](https://github.com/idaholab/moose) | 460 |
| 8 | [WhiteHouse/petitions](https://github.com/WhiteHouse/petitions) | 373 |
| 9 | [GSA/data.gov](https://github.com/GSA/data.gov) | 356 |
| 10| [materialsproject/pymatgen](https://github.com/materialsproject/pymatgen) | 309 |

### Top ten projects by watchers
| | | |
|---|---|---|
| 1  | [USArmyResearchLab/Dshell](https://github.com/USArmyResearchLab/Dshell) | 673 |
| 2  | [scipy/scipy](https://github.com/scipy/scipy) | 312 |
| 3  | [GSA/data.gov](https://github.com/GSA/data.gov) | 251 |
| 4  | [nasa/openmct](https://github.com/nasa/openmct) | 233 |
| 5  | [nasa/NASA-3D-Resources](https://github.com/nasa/NASA-3D-Resources) | 220 |
| 6  | [WhiteHouse/petitions](https://github.com/WhiteHouse/petitions) | 214 |
| 7  | [openscenegraph/OpenSceneGraph](https://github.com/openscenegraph/OpenSceneGraph) | 201 |
| 8  | [18F/api-standards](https://github.com/18F/api-standards) | 173 |
| 9  | [nsacyber/Windows-Secure-Host-Baseline](https://github.com/nsacyber/Windows-Secure-Host-Baseline) | 172 |
| 10 | [Code-dot-mil/code.mil](https://github.com/Code-dot-mil/code.mil) | 169 |

### Top ten projects by contributors
| | | |
|---|---|---|
| 1 | [scipy/scipy](https://github.com/scipy/scipy) | 669 |
| 2 | [trilinos/Trilinos](https://github.com/trilinos/Trilinos) | 197 |
| 3 | [SchedMD/slurm](https://github.com/SchedMD/slurm) | 162 |
| 4 | [18F/18f.gsa.gov](https://github.com/18F/18f.gsa.gov) | 139 |
| 5 | [Kitware/ParaView](https://github.com/Kitware/ParaView) | 136 |
| 6 | [GSA/wordpress-seo](https://github.com/GSA/wordpress-seo) | 119 |
| 7 | [department-of-veterans-affairs/vets-website](https://github.com/department-of-veterans-affairs/vets-website) | 116 |
| 8 | [idaholab/moose](https://github.com/idaholab/moose) | 114 |
| 9 | [materialsproject/pymatgen](https://github.com/materialsproject/pymatgen) | 113 |
| 10| [petsc/petsc](https://github.com/petsc/petsc) | 113 |

### Top ten projects by depedents
| | | |
|---|---|---|

### Top ten projects by commits
| | | |
|---|---|---|

### Notes
* Probot is only included as it adds some helpful features to octokit, including bottleneck and a handy graphql query.
  * I could probably wrap this myself, but ... ¯\_(ツ)_/¯
* `utils/github` and `utils/codegov` are abstractions to those SDKs providing additional functionality
* Not all interesting data is currently available in the public GraphQL schema. Hopefully this will be resolved in the future
* Current rate-limiting via bottleneck only supports a time-bound approach, not a computational bound approach
